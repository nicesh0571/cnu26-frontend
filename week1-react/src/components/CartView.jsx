export default function CartView({
  cart,
  totalPrice,
  onRemove,
  onUpdateQty,
  onClear,
  onClose,
}) {
  if (cart.length === 0) {
    return (
      <div className="cart-view">
        <div className="cart-header">
          <h2 className="cart-title">장바구니 (0개 상품)</h2>
          <button onClick={onClose} className="btn-close">닫기</button>
        </div>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          장바구니에 담긴 상품이 없습니다
        </div>
      </div>
    );
  }

  return (
    <div className="cart-view">
      {/* 헤더 */}
      <div className="cart-header">
        <h2 className="cart-title">장바구니 ({cart.length}개 상품)</h2>
        <button onClick={onClose} className="btn-close">닫기</button>
      </div>

      {/* 상품 목록 */}
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.productId} className="cart-item">
            {item.image && (
              <img src={item.image} alt={item.title} className="cart-item-image" />
            )}

            <div className="cart-item-info">
              <p className="cart-item-name">{item.title}</p>
              <p className="cart-item-price">
                {Number(item.price).toLocaleString()}원
              </p>
            </div>

            <div className="cart-item-quantity">
              <button
                className="qty-btn"
                onClick={() => { onUpdateQty(item.productId, item.quantity - 1); }}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="qty-value">{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => { onUpdateQty(item.productId, item.quantity + 1); }}
              >
                +
              </button>
            </div>

            <p className="cart-item-subtotal">
              {(item.price * item.quantity).toLocaleString()}원
            </p>

            <button
              className="btn-remove"
              onClick={() => { onRemove(item.productId); }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* 합계 & 결제 */}
      <div className="cart-summary">
        <div className="cart-total">
          <span>결제 예정 금액</span>
          <strong>{totalPrice.toLocaleString()}원</strong>
        </div>

        <div className="cart-actions">
          <button className="btn-clear" onClick={onClear}>
            장바구니 비우기
          </button>

          <button
            className="btn-checkout"
            onClick={() => {
              onClear();
              alert('결제가 완료되었습니다');
            }}
          >
            {totalPrice.toLocaleString()}원 결제
          </button>
        </div>
      </div>
    </div>
  );
}
