// import SimpleInput from './components/SimpleInput';
import BasicForm from './components/BasicForm';

function App() {
  return (
    <div className="app">
      {/* <SimpleInput /> */}
      <BasicForm />
    </div>
  );
}

export default App;

/* These validations are good for user experience, but they can't be used only in front-end, 
they don't guarantee security for your app, because the whole javascript code can be modified through
dev tools, so the user is able to send malicious data to your backend!
The validations must be implemented in back-end too */
