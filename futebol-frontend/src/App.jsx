// Arquivo: src/App.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  // Estado para a lista de jogadores
  const [jogadores, setJogadores] = useState([]);
  
  // Estados para o formulário de JOGADOR (criar/editar)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  
  // Estado para controlar o modo de edição de um jogador
  const [editingId, setEditingId] = useState(null);

  // Estados para o formulário de PAGAMENTO
  const [addingPaymentFor, setAddingPaymentFor] = useState(null); 
  const [novoPagamento, setNovoPagamento] = useState({ ano: '', mes: '', valor: '' });

  // Lógica para obter a data de hoje para o input de data
  const hoje = new Date();
  const dataMaxima = hoje.toISOString().split('T')[0];

  // Função para buscar todos os jogadores da API
  const buscarJogadores = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/jogadores');
      setJogadores(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
      setJogadores([]); // Garante que jogadores seja um array em caso de erro
    }
  };

  // useEffect para chamar a busca de jogadores uma vez quando o componente carrega
  useEffect(() => {
    buscarJogadores();
  }, []);
  
  // Função para lidar com o envio do formulário de JOGADOR (criação e atualização)
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (new Date(dataNascimento) > new Date()) {
      alert("A data de nascimento não pode ser uma data futura!");
      return;
    }

    const jogadorData = { nome, email, dataNascimento };

    if (editingId) {
      // Lógica de ATUALIZAÇÃO
      try {
        const response = await axios.put(`http://localhost:8080/api/jogadores/${editingId}`, jogadorData);
        setJogadores(jogadores.map(j => (j.id === editingId ? response.data : j)));
      } catch (error) {
        console.error("Erro ao atualizar jogador:", error);
      }
    } else {
      // Lógica de CRIAÇÃO
      try {
        const response = await axios.post('http://localhost:8080/api/jogadores', jogadorData);
        setJogadores([...jogadores, response.data]);
      } catch (error) {
        console.error("Erro ao cadastrar jogador:", error);
      }
    }
    limparFormulario();
  };
  
  // Prepara o formulário para editar um jogador
  const handleEdit = (jogador) => {
    setEditingId(jogador.id);
    setNome(jogador.nome);
    setEmail(jogador.email);
    setDataNascimento(jogador.dataNascimento);
  };
  
  // Limpa os campos do formulário de jogador e sai do modo de edição
  const limparFormulario = () => {
    setEditingId(null);
    setNome('');
    setEmail('');
    setDataNascimento('');
  };

  // Deleta um jogador
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este jogador?")) {
      try {
        await axios.delete(`http://localhost:8080/api/jogadores/${id}`);
        setJogadores(jogadores.filter(jogador => jogador.id !== id));
      } catch (error) {
        console.error("Erro ao deletar jogador:", error);
      }
    }
  };

  // Lida com a mudança nos inputs do formulário de pagamento
  const handlePaymentInputChange = (event) => {
    const { name, value } = event.target;
    setNovoPagamento(prevState => ({ ...prevState, [name]: value }));
  };

  // Envia o novo pagamento para a API
  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    if (!addingPaymentFor) return;

    try {
      const response = await axios.post(`http://localhost:8080/api/jogadores/${addingPaymentFor}/pagamentos`, novoPagamento);
      
      const jogadoresAtualizados = jogadores.map(jogador => {
        if (jogador.id === addingPaymentFor) {
          return { ...jogador, pagamentos: [...jogador.pagamentos, response.data] };
        }
        return jogador;
      });
      setJogadores(jogadoresAtualizados);

      setAddingPaymentFor(null);
      setNovoPagamento({ ano: '', mes: '', valor: '' });

    } catch (error) {
      console.error("Erro ao registrar pagamento:", error);
      alert("Falha ao registrar pagamento.");
    }
  };

  // Parte visual (JSX)
  return (
    <div className="container">
      <div className="form-container">
        <h2>{editingId ? 'Editar Jogador' : 'Cadastrar Novo Jogador'}</h2>
        <form onSubmit={handleSubmit}>
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
            <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required max={dataMaxima} />
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
        <h1>Lista de Jogadores</h1>
        {jogadores.length > 0 ? (
          <ul>
            {jogadores.map(jogador => (
              <li key={jogador.id}>
                <div className="player-info">
                  <span>
                    <strong>{jogador.nome}</strong> ({jogador.email}) - Nasc: {jogador.dataNascimento}
                  </span>
                  <div className="btn-group">
                    <button className="edit-btn" onClick={() => handleEdit(jogador)}>Editar</button>
                    <button className="delete-btn" onClick={() => handleDelete(jogador.id)}>Deletar</button>
                  </div>
                </div>

                <div className="payments-section">
                  <h4>Pagamentos:</h4>
                  {jogador.pagamentos && jogador.pagamentos.length > 0 ? (
                    <ul className="payments-list">
                      {jogador.pagamentos.map(pagamento => (
                        <li key={pagamento.id} className="payment-item">
                          - Mês/Ano: {pagamento.mes}/{pagamento.ano} | Valor: R$ {pagamento.valor}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-payments">Nenhum pagamento registrado.</p>
                  )}

                  {addingPaymentFor === jogador.id ? (
                    <form onSubmit={handlePaymentSubmit} className="payment-form">
                      <input type="number" name="ano" placeholder="Ano (ex: 2025)" value={novoPagamento.ano} onChange={handlePaymentInputChange} required />
                      <input type="number" name="mes" placeholder="Mês (1-12)" value={novoPagamento.mes} onChange={handlePaymentInputChange} required min="1" max="12" />
                      <input type="number" name="valor" placeholder="Valor (ex: 150.00)" value={novoPagamento.valor} onChange={handlePaymentInputChange} required step="0.01" />
                      <button type="submit">Salvar</button>
                      <button type="button" className="cancel-btn-small" onClick={() => setAddingPaymentFor(null)}>Cancelar</button>
                    </form>
                  ) : (
                    <button className="add-payment-btn" onClick={() => setAddingPaymentFor(jogador.id)}>
                      Adicionar Pagamento
                    </button>
                  )}
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