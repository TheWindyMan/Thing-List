import React, {Component} from 'react'
import './Thing.css'
import Actions from './Actions'
import ContentEditable from 'react-contenteditable'

class Thing extends Component {
    componentDidMount() {
        if (!this.nameInput.htmlEl.textContent) {
            this.nameInput.htmlEl.focus()
        }
    }

    checked = (ev) => {
        const { thing, saveThing } = this.props
        thing.completed = ev.target.checked
        saveThing(thing)
    }


    handleChange = (ev) => {
        const { thing, saveThing } = this.props
        const field = ev.currentTarget.getAttribute('name')
        thing[field] = ev.target.value
        saveThing(thing)
    }

    blurOnEnter = (ev) => {
        if (ev.key === 'Enter'){
            ev.preventDefault()
            ev.target.blur()
        }
    }

    render(){
        const {thing, removeThing } = this.props

        return (
            <li className="Thing">
                <input 
                    type="checkbox"
                    defaultChecked={thing.completed}
                    onChange={this.checked}
                />
                <div className="details">
                    <ContentEditable
                        className="name"
                        name="name"
                        html={thing.name}
                        onChange={this.handleChange}
                        onKeyPress={this.blurOnEnter}
                        ref={input => this.nameInput = input}
                    />
                    <input 
                        type="date"
                        name="dueOn"
                        defaultValue={thing.dueOn} 
                        onChange={this.handleChange}
                     />
                    <Actions thing={thing} removeThing={removeThing}/>
                </div>
            </li>
        )
    }
}
export default Thing