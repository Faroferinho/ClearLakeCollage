import './App.css';

function App() {
  return (
    <div>
      <header className="App-header">
        <h1>Inserção de Alunos</h1>
        <form action="createStudent" class="form">
          <label name="name">Nome</label><br/>
          <input type='text' name='name'/><br/>
          
          <label name="phone">Telefone</label><br/>
          <input type='text' name='phone'/><br/>
          
          <label name="email">Email</label><br/>
          <input type='text' name='email'/><br/>

          <label name="address">Endereço</label><br/>
          <input type='text' name='address'/><br/>

          <input type="submit" value={"Enviar"}/>
        </form>
      </header>
    </div>
  );
}

export default App;
