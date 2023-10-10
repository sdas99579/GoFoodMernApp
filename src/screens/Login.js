import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email, password: credentials.password
      })


    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials!!!")
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }

  }


  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-success mb-4">
          <div class="container-fluid">
            <Link class="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav me-auto mb-2">
                <li class="nav-item">
                  <Link class="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div>
        <div className='container'>
          <form onSubmit={handleSubmit}  >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
            </div>

            <button type="submit" className="btn btn-success">Submit</button>
            <Link to="/creatuser" className='m-3 btn btn-danger'>I'm a new user</Link>
            {/* <Link to="/" className='m-3 btn btn-danger'>Home</Link> */}
          </form>
        </div>
      </div>



      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </div>




      
      <div>
        <Footer />
      </div>
    </>
  )
}
