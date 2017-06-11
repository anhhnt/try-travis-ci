import React, { Component } from 'react'
import firebase from 'firebase'

class TryTravis extends Component {
  constructor() {
    super()
    this.state = {
      savedImages: []
    }
  }
  onChange(evt) {
    const files = evt.target.files
    let file = files[0]
    this.setState({file: file})
  }

  submit() {
    let file = this.state.file
    let imagesRef = this.storageRef.child(`images/${file.name}`)
    imagesRef.put(file).then((snapshot) => {
      this.rtImagesRef.push().set({
        fullPath: snapshot.metadata.fullPath,
        generation: snapshot.metadata.generation,
        downloadURL: snapshot.metadata.downloadURLs[0],
        size: snapshot.metadata.size
      })
    })
  }

  componentDidMount() {
    this.storageRef = firebase.storage().ref()
    const database = firebase.database()
    this.rtImagesRef = database.ref('images')
    const savedImages = []
    this.rtImagesRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key
        const value = childSnapshot.val().downloadURL
        savedImages.push({ key, value })
      })
    })
    this.setState(Object.assign({}, this.state, { savedImages }))
  }
  render() {
    return (
      <div>
        Hello Travis-ci
        <br/>
        Please select a file to upload
        <br/>
        <input
          type="file" id="files" name="files[]"
          multiple onChange={(evt) => this.onChange(evt)}
        />
        <br/>
        <button onClick={(evt) => this.submit(evt)}>Upload</button>
        {this.state.savedImages.map((img) => (
          <img key={img.key} src={img.value}/>
        ))}
      </div>
    )
  }
}

export default TryTravis
