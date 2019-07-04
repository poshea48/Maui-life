import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
// import { Link } from 'react-router-dom';
import {
  getTodos,
  toggleCompleted,
  deleteTodo
} from "../../actions/todoActions";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  width: 48%;
  @media (max-width: 720px) {
    width: 100%;
  }
`;

const FixedSection = styled(Section)`
  margin-top: 35px;

  @media (max-width: 720px) {
    margin-top: 0;
    position: sticky;
    bottom: 50px;
    background: #f2f3f5;
    padding-bottom: 10px;
  }
`;

const Title = styled.h3`
  text-align: center;
  height: 1.2em;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  @media (max-width: 720px) {
    flex-wrap: none;
    border-bottom: 0;
  }
`;

const TodosHome = ({ getTodos, toggleCompleted, deleteTodo }) => {
  const todos = useSelector(state => {
    return state.todos.todos;
  });

  useEffect(
    () => {
      console.log("effect being called");
      getTodos();
    },
    [getTodos]
  );

  const loading = useSelector(state => state.todos.loading);
  // const auth = useSelector(state => state.auth);

  const onChecked = todoId => () => {
    toggleCompleted(todoId);
  };

  const remove = todoId => () => {
    deleteTodo(todoId);
  };

  let todosContent;

  if (todos === null || loading) {
    todosContent = <Spinner />;
  } else {
    // Check if logged in user has any todos
    if (isEmpty(todos)) {
      // User logged in with no todos
      todosContent = <p>No todos recorded yet</p>;
    } else {
      todosContent = (
        <Scroll>
          {todos.map((todo, i) => {
            return (
              <div key={i}>
                <TodoItem
                  todo={todo}
                  onChecked={onChecked}
                  deleteTodo={remove}
                />
              </div>
            );
          })}
        </Scroll>
      );
    }
  }

  return (
    <Container>
      <Content>
        <Section>
          <Title>Your Todos!</Title>

          {todosContent}
        </Section>
        <FixedSection>
          <AddTodo />
        </FixedSection>
      </Content>
    </Container>
  );
};

// class TodosHome extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       todos: []
//     };
//   }
//   componentDidMount() {
//     this.props.getTodos();
//   }
//
//   onChecked = todoId => () => {
//     this.props.toggleCompleted(todoId);
//   };
//
//   deleteTodo = todoId => () => {
//     this.props.deleteTodo(todoId);
//   };
//
//   render() {
//     const { todos, loading } = this.props.todos;
//     let todosContent;
//
//     if (todos === null || loading) {
//       todosContent = <Spinner />;
//     } else {
//       // Check if logged in user has any todos
//       if (isEmpty(todos)) {
//         // User logged in with no todos
//         todosContent = <p>You dont have anything to do yet</p>;
//       } else {
//         todosContent = (
//           <div className="todos-content">
//             <Scroll>
//               <ul className="list-unstyled">
//                 {todos.map((todo, i) => {
//                   return (
//                     <li className="todo-content" key={i}>
//                       <TodoItem
//                         todo={todo}
//                         onChecked={this.onChecked}
//                         deleteTodo={this.deleteTodo}
//                       />
//                     </li>
//                   );
//                 })}
//               </ul>
//             </Scroll>
//           </div>
//         );
//       }
//     }
//
//     return (
//       <div className="home">
//         <div className="container">
//           <h3 className="text-center text-muted mb-4">Your Things to DO!</h3>
//           <div className="row">
//             <div className="col-md-6">{todosContent}</div>
//             <div className="col-md-6">
//               <AddTodo />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// TodosHome.propTypes = {
//   getTodos: PropTypes.func.isRequired,
//   toggleCompleted: PropTypes.func.isRequired,
//   deleteTodo: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   todos: PropTypes.object.isRequired
// };

const mapStateToProps = ({ todos, auth }) => ({
  todos,
  auth
});

export default connect(
  mapStateToProps,
  { getTodos, toggleCompleted, deleteTodo }
)(TodosHome);
