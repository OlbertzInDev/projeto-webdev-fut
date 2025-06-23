// Arquivo: src/App.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jogadores, setJogadores] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [editingId, setEditingId] = useState(null);

  // --- NOVO: LÓGICA PARA OBTER A DATA DE HOJE ---
  // Criamos uma string com a data de hoje no formato AAAA-MM-DD
  // para usar no atributo 'max' do campo de data.
  const hoje = new Date();
  const dataMaxima = hoje.toISOString().split('T')[0];


  const buscarJogadores = async () => { /* ... sem mudanças aqui ... */ 
    try {
      const response = await axios.get('http://localhost:8080/api/jogadores');
      setJogadores(response.data);
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
    }
  };

  useEffect(() => { /* ... sem mudanças aqui ... */
    buscarJogadores();
  }, []);

  // --- FUNÇÃO handleSubmit ATUALIZADA COM VALIDAÇÃO ---
  const handleSubmit = async (event) => {
    event.preventDefault();

    // --- NOVA VALIDAÇÃO DE DATA ---
    // Comparamos a data de nascimento inserida com a data atual.
    // new Date() cria a data atual no momento do clique.
    if (new Date(dataNascimento) > new Date()) {
      alert("A data de nascimento não pode ser uma data futura!");
      return; // Interrompe a execução da função se a data for inválida.
    }

    const jogadorData = { nome, email, dataNascimento };

    if (editingId) {
      // Lógica de atualização (sem mudanças)
      try {
        const response = await axios.put(`http://localhost:8080/api/jogadores/${editingId}`, jogadorData);
        setJogadores(jogadores.map(j => (j.id === editingId ? response.data : j)));
      } catch (error) {
        console.error("Erro ao atualizar jogador:", error);
      }
    } else {
      // Lógica de criação (sem mudanças)
      try {
        const response = await axios.post('http://localhost:8080/api/jogadores', jogadorData);
        setJogadores([...jogadores, response.data]);
      } catch (error) {
        console.error("Erro ao cadastrar jogador:", error);
      }
    }
    limparFormulario();
  };

  const handleEdit = (jogador) => { /* ... sem mudanças aqui ... */
    setEditingId(jogador.id);
    setNome(jogador.nome);
    setEmail(jogador.email);
    setDataNascimento(jogador.dataNascimento);
  };
  
  const limparFormulario = () => { /* ... sem mudanças aqui ... */
    setEditingId(null);
    setNome('');
    setEmail('');
    setDataNascimento('');
  };

  const handleDelete = async (id) => { /* ... sem mudanças aqui ... */
    if (window.confirm("Tem certeza que deseja deletar este jogador?")) {
      try {
        await axios.delete(`http://localhost:8080/api/jogadores/${id}`);
        setJogadores(jogadores.filter(jogador => jogador.id !== id));
      } catch (error) {
        console.error("Erro ao deletar jogador:", error);
      }
    }
  };

  // --- PARTE VISUAL (JSX) ATUALIZADA ---
  return (
    <div className="container">
      <div className="form-container">
        <h2>{editingId ? 'Editar Jogador' : 'Cadastrar Novo Jogador'}</h2>
        <form onSubmit={handleSubmit}>
          {/* ... outros inputs ... */}
          <div>
            <label>Nome:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Data de Nascimento:</label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
              // --- NOVO: ATRIBUTO 'max' ADICIONADO ---
              // Isso desabilitará a seleção de datas futuras no calendário do navegador.
              max={dataMaxima}
            />
          </div>
          <button type="submit">{editingId ? 'Atualizar Jogador' : 'Salvar Jogador'}</button>
          {editingId && (
            <button type="button" className="cancel-btn" onClick={limparFormulario}>
              Cancelar Edição
            </button>
          )}
        </form>
      </div>

      <hr />

      <div className="list-container">
        {/* ... lista de jogadores (sem mudanças) ... */}
        <h1>Lista de Jogadores</h1>
        {jogadores.length > 0 ? (
          <ul>
            {jogadores.map(jogador => (
              <li key={jogador.id}>
                <span>
                  <strong>{jogador.nome}</strong> ({jogador.email}) - Nasc: {jogador.dataNascimento}
                </span>
                <div className="btn-group">
                  <button className="edit-btn" onClick={() => handleEdit(jogador)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(jogador.id)}>Deletar</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum jogador encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default App;