import axios from 'axios'

const region = (id) =>{
	axios.get('https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=' + id)
	.then((res) => {
		console.log(res.data)
	})
	.catch((err) => {
		console.log(res.data)
	})
}

export default region

