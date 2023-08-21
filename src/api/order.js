import request from '@/utils/request'

// mode:card=> obj=> {cardId,remark}
// mode:butNow=> obj=> {goodsId,goodsNum,goodsSkuId,remark}
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      ...obj, // 将传递过来的参数动态展开
      delivery: 10,
      couponId: 0,
      isUsePoints: 0
    }
  })
}

export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    ...obj,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10
  })
}

export const getOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}

export const cencelOrder = (orderId) => {
  return request.post('/order/cancel', {
    orderId
  })
}

export const receiptOrder = (orderId) => {
  return request.post('/order/receipt', {
    orderId
  })
}
