import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLogin from '../../components/Admin/Login/Login';
import { AdminAuth } from '../../Api/AdminApi/AdminRequest'

function AdminSignin() {
    const Navigate = useNavigate()

    const userAuthenticeted = async () => {
        try {
            const { data } = await AdminAuth()
            if (data.auth) Navigate('/admin/dashboard')
            else Navigate("/admin");
        } catch (error) {
            console.log(error, 'catch error');
        }
    };

    useEffect(() => {
        userAuthenticeted()
    }, [Navigate]);
  return (
    <div>
          <AdminLogin />
    </div>
  )
}

export default AdminSignin
