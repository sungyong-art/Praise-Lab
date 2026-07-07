// ============================================================
// PayPal 결제 버튼 컴포넌트
// ============================================================
// 기존 프로젝트(수익화웹사이트첫걸음, globalaieducation)에서
// 검증된 패턴을 기반으로 제작
//
// 사용법:
//   <PayPalCheckoutButton
//     product={product}
//     onSuccess={(details) => console.log('결제 완료', details)}
//     onError={(err) => console.error(err)}
//   />
// ============================================================

import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type { PayPalProduct } from '../../lib/paypal';

interface PayPalCheckoutButtonProps {
  product: PayPalProduct;
  onSuccess: (details: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
}

const PayPalCheckoutButton: React.FC<PayPalCheckoutButtonProps> = ({
  product,
  onSuccess,
  onError,
  onCancel,
}) => {
  const [{ isRejected, isPending }] = usePayPalScriptReducer();

  if (isRejected) {
    return (
      <div className="w-full text-center py-2 px-3 bg-red-500/10 border border-red-500/25 rounded-lg text-red-400 text-[11.5px] leading-snug">
        ⚠️ PayPal 결제 모듈 로드 실패<br/>
        (Client ID가 만료되었거나 유효하지 않습니다.)
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {isPending && (
        <div className="w-full text-center py-3.5 bg-white/[0.02] border border-white/5 rounded-lg text-white/30 text-[12px] animate-pulse">
          PayPal 로딩 중...
        </div>
      )}
      <PayPalButtons
        forceReRender={[product.price, product.id]}
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 50,
          tagline: false,
        }}
        createOrder={(_data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: product.description,
                custom_id: product.id,
                amount: {
                  currency_code: product.currency,
                  value: product.price,
                  breakdown: {
                    item_total: {
                      currency_code: product.currency,
                      value: product.price,
                    },
                  },
                },
                items: [
                  {
                    name: product.name,
                    unit_amount: {
                      currency_code: product.currency,
                      value: product.price,
                    },
                    quantity: '1',
                    category: 'DIGITAL_GOODS' as const,
                  },
                ],
              },
            ],
            application_context: {
              brand_name: 'Connect AI LAB',
              shipping_preference: 'NO_SHIPPING' as const,
              user_action: 'PAY_NOW' as const,
            },
          });
        }}
        onApprove={async (_data, actions) => {
          if (actions.order) {
            const details = await actions.order.capture();
            onSuccess(details);
          }
        }}
        onError={(err) => {
          console.error('[PayPal] Error:', err);
          onError?.(err);
        }}
        onCancel={() => {
          onCancel?.();
        }}
      />
    </div>
  );
};

export default PayPalCheckoutButton;
