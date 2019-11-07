// import React, { Component } from 'react';
// import { AuthUserContext, withAuthorization } from '../Session';
// import { withFirebase } from '../Firebase';
// import { compose } from 'recompose';
// import storage from '../Firebase';
//
// class CreateProduct extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       image: null,
//       url: '',
//       progress: 0,
//       category: '',
//       namedish: '',
//       img: '',
//       title: '',
//       price: '',
//       loading: false,
//       messages: [],
//       limit: 5,
//     };
//   }
//
//
//   componentDidMount() {
//     this.onListenForMessages();
//   }
//
//   onListenForMessages = () => {
//     this.setState({ loading: true });
//
//     this.unsubscribe = this.props.firebase
//       .messages()
//       .orderBy('createdAt', 'desc')
//       .limit(this.state.limit)
//       .onSnapshot(snapshot => {
//         if (snapshot.size) {
//           let messages = [];
//           snapshot.forEach(doc =>
//             messages.push({ ...doc.data(), uid: doc.id }),
//           );
//
//           this.setState({
//             messages: messages.reverse(),
//             loading: false,
//           });
//         } else {
//           this.setState({ messages: null, loading: false });
//         }
//       });
//   };
//
//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//
//   onChangeText = event => {
//     this.setState({ namedish: event.target.value });
//   };
//   onChangePrice = event => {
//     this.setState({ price: event.target.value });
//   };
//   onChangeCategory = event => {
//     this.setState({ category: event.target.value });
//   };
//   onChangeTitle = event => {
//     this.setState({ title: event.target.value });
//   };
//
//   handleChange = e => {
//     if (e.target.files[0]) {
//       const image = e.target.files[0];
//       this.setState(() => ({ image }));
//     }
//   };
//
//
//    handleUpload = (event, authUser) => {
//      event.preventDefault();
//     const { image } = this.state;
//     const uploadTask = storage.ref(`images/${image.name}`).put(image);
//     uploadTask.on(
//       'state_changed',
//       snapshot => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
//         );
//         this.setState({ progress });
//       },
//       error => {
//         console.log(error);
//       },
//       () => {
//         storage
//           .ref('images')
//           .child(image.name)
//           .getDownloadURL()
//           .then(url => {
//             this.setState({ url });
//             this.onCreateMessage(authUser);
//             console.log(url);
//           });
//       });
//   };
//
//   onCreateMessage = (authUser,url) => {
//     this.props.firebase.messages().add({
//       category: this.state.category,
//       namedish: this.state.namedish,
//       price: this.state.price,
//       title: this.state.title,
//       url,
//       userId: authUser.uid,
//       createdAt: this.props.firebase.fieldValue.serverTimestamp(),
//     });
//
//     this.setState({ namedish: '', price: '', catgory: '', url: '', title: '' });
//   };
//
//   render() {
//     const { category, namedish, price, title } = this.state;
//
//     return (
//       <AuthUserContext.Consumer>
//         {authUser => (
//           <div>
//             <form className="container">
//               <div className="form-group row">
//                 <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
//                   Category:
//                 </label>
//                 <div className="col-sm-5">
//                   <input
//                     placeholder="Category"
//                     type="text"
//                     className="form-control"
//                     value={category}
//                     onChange={this.onChangeCategory}
//                   />
//                 </div>
//               </div>
//               <div className="form-group row">
//                 <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
//                   Name :
//                 </label>
//                 <div className="col-sm-5">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Name"
//                     value={namedish}
//                     onChange={this.onChangeText}
//                   />
//                 </div>
//               </div>
//               <div className="form-group row">
//                 <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
//                   Image :
//                 </label>
//                 <input type="file" onChange={this.handleChange}/>
//                 <div className="col-sm-5">
//                 </div>
//               </div>
//               <div className="form-group row">
//                 <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
//                   Title :
//                 </label>
//                 <div className="col-sm-5">
//
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Title"
//                     value={title}
//                     onChange={this.onChangeTitle}
//                   />
//                 </div>
//               </div>
//               <div className="form-group row">
//                 <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
//                   Price :
//                 </label>
//                 <div className="col-sm-5">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Price"
//                     value={price}
//                     onChange={this.onChangePrice}
//                   />
//                 </div>
//               </div>
//               <button type="submit" onClick={() => this.handleUpload(authUser)}>Send</button>
//             </form>
//           </div>
//         )}
//       </AuthUserContext.Consumer>
//     );
//   }
// }
//
// const condition = authUser => !!authUser;
//
// export default compose(
//   withFirebase,
//   withAuthorization(condition),
// )(CreateProduct);
import React, { Component } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import storage from '../Firebase';

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      namedish: '',
      img:'',
      title:'',
      price: '',
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .messages()
      .orderBy('createdAt', 'desc')
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let messages = [];
          snapshot.forEach(doc =>
            messages.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            messages: messages.reverse(),
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChangeText = event => {
    this.setState({ namedish: event.target.value });
  };
  onChangePrice = event => {
    this.setState({ price: event.target.value });
  };
  onChangeCategory = event => {
    this.setState({ category: event.target.value });
  };
  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };
  onChangeImg = event => {
    this.setState({ img: event.target.value });
  };

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };


  handleUpload = (event, authUser) => {
    event.preventDefault();
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
            this.onCreateMessage(authUser);
          });
      });
    event.preventDefault();
  };

  onCreateMessage = ( authUser) => {
    this.props.firebase.messages().add({
      category: this.state.category,
      namedish: this.state.namedish,
      price: this.state.price,
      title:this.state.title,
      userId: authUser.uid,
      url:this.state.url,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    });

    this.setState({ namedish: '', price: '', catgory: '' ,url:'',title:''});

  };

  render() {
    const { category, namedish, price,title } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <form className="container" onSubmit={event =>
              this.handleUpload(event, authUser)
            }>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
                  Category:
                </label>
                <div className="col-sm-5">
                  <input
                    placeholder="Category"
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={this.onChangeCategory}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
                  Name :
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={namedish}
                    onChange={this.onChangeText}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
                  Image :
                </label>
                <div className="col-sm-5">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Image"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
                  Title :
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
                  Price :
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                    onChange={this.onChangePrice}
                  />
                </div>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(CreateProduct);