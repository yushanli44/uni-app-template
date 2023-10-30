import {
	url
} from '../url.js'
let BasePath = url

export const httpRequest = options => {
	let header = {
			Authorization: 'Bearer ' + uni.getStorageSync('token'),
		}
	return new Promise((resolve, reject) => {
	uni.request({
			url: BasePath + options.url,
			method: options.method || "GET", // 请求类型，默认为GET
			data: options.data || {}, // 请求参数，默认空对象
			header: options.header || {}, // 默认空对象
			success: res => {
				// 状态判断，根据后台定义并提示
				if(res.data.code == 401 || res.data.code == 403){
					uni.showToast({
						title: res.data.msg
					})
					uni.redirectTo({
						url: '/pages/login/login'
					})
				}else if (res.data.code == '200') {
					resolve(res)
				} else {
					uni.showModal({
						title: '错误提示',
						content: res.data.msg,
					})
					resolve(res)
				}
			},
			fail: err => {
				uni.showToast({
					title: "请求失败！"
				})
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}
export const loginRequest = options => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + options.url,
			method: "POST", // 请求类型，默认为GET
			data: options.data || {}, // 请求参数，默认空对象
			success: res => {
				// 状态判断，根据后台定义并提示
				if (res.data.code == '200') {
					uni.showToast({
						title: '登录成功',
						icon: 'success'
					});
					uni.setStorageSync('token', res.data.token);
					uni.redirectTo({
						url: "/pages/menu/menu"
					})
					resolve(res)
				} else {
					uni.showModal({
						title: '错误提示',
						content: res.data.msg,
					})
					return
				}
			},
			fail: err => {
				uni.showToast({
					title: "请求失败！"
				})
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}
export const getRequest = (options = {}) => {
	let header = {
			Authorization: 'Bearer ' + uni.getStorageSync('token'),
		}
	options.method = 'GET';
	options.header = header;
	return httpRequest(options)
}

export const postRequest = (options = {}) => {
	let header = {
			Authorization: 'Bearer ' + uni.getStorageSync('token'),
		}
	options.method = 'POST';
	options.header = header;
	return httpRequest(options)
}
export const putRequest = (options = {}) => {
	let header = {
			Authorization: 'Bearer ' + uni.getStorageSync('token'),
		}
	options.method = 'PUT';
	options.header = header;
	return httpRequest(options)
}