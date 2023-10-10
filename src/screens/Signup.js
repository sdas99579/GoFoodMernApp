import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';

export default function Signup() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "", phoneno: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/creatuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name, email: credentials.email, password: credentials.password,
                location: credentials.geolocation, phoneno: credentials.phoneno
            })


        });
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("Enter valid credentials!!!")
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
              <ul class="navbar-nav ms-auto mb-2">
                <li class="nav-item">
                  <Link class="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>






            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" name='phoneno' value={credentials.phoneno} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.address} onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>ALready a user</Link>
                </form>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
}
