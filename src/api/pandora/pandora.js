import request from '@/utils/request'

// 查询列表
export function query(query) {
  return request({
    url: '/system/pandora/queryList',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: query
  })
}

// 查询图片列表
export function queryImgList() {
  return request({
    url: '/system/pandora/getPandoraFile',
    method: 'get'
  })
}

// form提交
export function submitForm(formData) {
  return request({
    url: '/system/pandora/uploadImg',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
