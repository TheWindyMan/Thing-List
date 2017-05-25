import React, { Component } from 'react';

import './App.css';
import Header from './Header'
import ThingList from './ThingList'
import AddThingButton from './AddThingButton'
import SignIn from './SignIn'
import SignOut from './SignOut'
import base, { auth } from './base'

class App extends Component {
  componentWillMount() {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.authHandler({user})
        }
      }
    )
  }

  state = {
    things: {},
    uid: null
  }

  setupThings = () => {
    this.ref = base.syncState(
      `${this.state.uid}/things`,
      {
        context: this,
        state: 'things'
      }
    )
  }

  authHandler = (authData) => {
    this.setState(
      { uid: authData.user.uid },
      this.setupThings
    )
  }
  thing() {
    return {
      id: `thing-${Date.now()}`,
      name: '',
      completed: false,
      dueOn: '',
    }
  }
  addThing = () => {
    const things = {...this.state.things}
    const thing = this.thing()
    things[thing.id] = thing
    this.setState({ things })
  }

  renderThings = () => {
    const actions = {
      saveThing: this.saveThing,
      removeThing: this.removeThing,
    }

    return (
      <div>
        <SignOut signOut={this.signOut} />
        <AddThingButton addThing={this.addThing} />
        <ThingList 
          things={this.state.things}
          {...actions}/>
      </div>
    )
  }

  signOut = () => {
    auth
      .signOut()
      .then(() => this.setState({uid: null}))
  }
  saveThing = (thing) => {
    const things = {...this.state.things}
    things[thing.id] = thing
    this.setState({ things })
  }

  removeThing = (thing) => {
    const things = {...this.state.things}
    things[thing.id] = null
    this.setState({ things })
  }


  render() {
    return (
      <div className="App">
        <Header />
        { this.state.uid ? this.renderThings() : <SignIn authHandler={this.authHandler} />}
      </div>
    );
  }
}

export default App;
