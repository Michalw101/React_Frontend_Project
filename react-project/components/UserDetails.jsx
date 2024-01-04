const UserDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const user_Name = searchParams.get('userName');
    const user_Password = searchParams.get('password');
  
    const [user, setUser] = useState({
      id: "",
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: ""
        }
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: ""
      }
    });
  
    const [signUpError, setSignUpError] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser(prevUser => ({
        ...prevUser,
        [name]: value,
        address: {
          ...prevUser.address,
          geo: {
            ...prevUser.address.geo,
            [name === "address.geo.lat" ? "lat" : "lng"]: value,
          },
        },
        company: {
          ...prevUser.company,
          [name === "company.catchPhrase" ? "catchPhrase" : name]: value,
        },
      }));
    }
  
    const postUser = () => {
      setUser(prevUser => ({
        ...prevUser,
        username: user_Name,
        website: user_Password,
      }));
  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
        fetch(`http://localhost:3000/users`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUser((prevUser) => ({ ...prevUser, id: data.id }));
                localStorage.setItem("currentUser", user[0].id);
                localStorage.setItem( user[0].id, JSON.stringify(user[0]));
                navigate('/home');
            })
            .catch((error) => {
                setSignUpError(error.toString());
                console.error('There was an error!', error);
            });
    };


    return (

        <div>
            <h2 className="title">User Details</h2><br />
            <input type="text" className='input' value={user.name} name="name" placeholder="name" onChange={handleChange} /><br />
            <input type="text" className='input' value={user.email} name="email" placeholder="email" onChange={handleChange} /><br />
            <input type="text" className='input' value={user.address.street} name="address.street" placeholder="street" onChange={handleChange} /><br />
            <input type="text" className='input' value={user.address.suite} name="address.suite" placeholder="suite" onChange={handleChange} /><br />
            <input type="text" className='input' value={user.address.city} name="address.city" placeholder="city" onChange={handleChange} /><br />
            <input type="text" className='input' value={user.address.zipcode} name="address.zipcode" placeholder="zipcode" onChange={handleChange} /><br />
            <input type="text" className='input' value={user.address.geo.lat} name="address.geo.lat" placeholder="lat" onChange={handleChange} /><br />
            <input type="text" className='input' value={user.address.geo.lng} name="address.geo.lng" placeholder="lng" onChange={handleChange} /><br />
            <input type="text" className='input' value={user.phone} name="phone" placeholder="phone" onChange={handleChange} /><br />
            <input type="text" className='input' value={user.company.name} name="company.name" placeholder="company's name" onChange={handleChange} /><br />
            <input type="text" className='input' value={user.company.catchPhrase} name="company.catchPhrase" placeholder="catch phrase" onChange={handleChange} /><br />
            <input type="text" className='input' value={user.company.bs} name="bs" placeholder="company.bs" onChange={handleChange} /><br />
            {signUpError && <p className='error' style={{ color: "red" }}>{signUpError}</p>}
            <button className="Connect" onClick={postUser}>Connect</button><br />
        </div>
    )
}


export default UserDetails