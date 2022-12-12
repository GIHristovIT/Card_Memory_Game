import * as React from 'react'
import randomEmoji from 'random-emoji'
import { useState, useEffect } from 'react'

const DIFFERENT_EMOJI_COUNT = 6
const emojis = randomEmoji.random({ count: DIFFERENT_EMOJI_COUNT })
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const Componen = () => {
  const [firstPick, setFirstPick] = useState("")
  const [emojis2, setEmoji2] = useState([...emojis, ...emojis])
  const [areVisible, setAreVisible] = useState(true)

  useEffect(() => {
    setEmoji2(shuffle(emojis2).map((o, index) => ({ ...o, isPresent: `No`, id: index })))
    setTimeout(function () { setAreVisible(false); }, 1000);
  }, [])


  function chnangeState(param) {
    if (firstPick === "") {   //on first click
      setFirstPick(emojis2[param].name) //store the name      
      let items = [...emojis2];
      // 2. Make a shallow copy of the item you want to mutate
      let item = { ...items[param] };
      // 3. Replace the property you're intested in
      item.isPresent = "Yes";
      // 4. Put it back into our array. N.B. we *are* mutating the array here, 
      //    but that's why we made a copy first
      items[param] = item;
      // 5. Set the state to our new copy      
      setEmoji2(items);

    }
    else {
      let secondPick = emojis2[param].name  //on second click     
      if (firstPick === secondPick) { //if it maches the first one        
        const newArr = emojis2.map(obj => {
          if (obj.name === firstPick) {
            return { ...obj, isPresent: 'Yes' };
          }
          else {
            return obj
          }
        })
        setEmoji2(newArr)
      } else { // if it does not match
        const newArr = emojis2.map(obj => {
          if (obj.id === param || obj.isPresent === "Yes") {
            return { ...obj, isPresent: 'Yes' };
          }
          else {
            return obj;
          }
        })

        setEmoji2(newArr)


        setTimeout(function () {
          const newArr = emojis2.map(obj => {
            if (obj.isPresent !== "Yes" || obj.name === firstPick || obj.name === secondPick) {
              return { ...obj, isPresent: 'No' };
            } else return obj
          })
          setEmoji2(newArr)
        }, 1000);
      }

      setFirstPick("")
    }
  }

  return (<div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
    {emojis2.map(function (item, index) {
      return (
        <div key={index} 
        style={{ display: 'flex', justifyContent: 'space-around', flex: '30%', marginBottom: 15 }} 
        onClick={() => chnangeState(item.id)}>
          {(areVisible || item.isPresent === "Yes") ? item.character : "TRY ME"}
          </div>
      )
    })}
  </div>
  )
}
export default Componen



