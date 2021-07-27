import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const validated = useState(null);

axios.post('https://manpreet-movieapi.herokuapp.com/users', {
  Username: username,
  Password: password,
  Email: email,
  Birthday: birthday
})
.then(response => {
  const data = response.data;
  console.log(data);
  window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
})
.catch(e => {
  console.log('error registering the user')
})};
