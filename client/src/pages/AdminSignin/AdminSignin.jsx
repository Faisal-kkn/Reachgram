import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLogin from '../../components/Admin/Login/Login';

function AdminSignin() {
    const Navigate = useNavigate()

    const userAuthenticeted = () => {
        axios.get("http://localhost:5000/admin/isAdminAuth", {
            headers: {
                "x-access-token": localStorage.getItem("adminToken"),
            },
        }).then((response) => {
            if (response.data.auth) Navigate('/admin/dashboard')
            else Navigate("/admin");
        });
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
