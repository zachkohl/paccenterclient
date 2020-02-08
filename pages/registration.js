import Register from "../components/Register.jsx";

function Registration({ email }) {
  return (
    <div>
      <Register email={email} />
    </div>
  );
}

Registration.getInitialProps = function(req) {
  const email = "zach.kohl@gmail.com";
  return { email: email };
};

export default Registration;
