import AppRouter from './router/AppRouter';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.container}>
      <AppRouter />
    </div>
  );
};

export default App;
