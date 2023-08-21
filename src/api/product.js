import request from '@/utils/request'

export const getProlist = (obj) => {
  const { categoryld, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryld,
      goodsName,
      page
    }
  })
}

export const getProdetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

export const getProcomment = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
