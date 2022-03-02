import {loginStart, loginFailure , loginSuccess} from './userRedux'
import {publicRequest} from '../requestMethod'


export const login = async (dispatch,user)=>{
    console.log(user);
     dispatch(loginStart())
     try {
         const res = await publicRequest.post('/auth/login',user)
         console.log('apicall wala ressponse',res.data);
         dispatch(loginSuccess(res.data))
     } catch (error) {
         dispatch(loginFailure(error))
     }
}