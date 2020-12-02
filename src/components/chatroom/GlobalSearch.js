import { SearchOutlined } from "@material-ui/icons";
import React, { useState} from "react";
import "./GlobalSearch.css";
import { IconButton } from "@material-ui/core";
import FriendsSearchList from "./FriendsSearchList"
import axios from "../../helpers/axios"
import { useStateValue } from "../../StateProvider";
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme)=> ({
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -18,
    marginLeft: -18,
  }
}))

function GlobalSearch() {
  const [people, setPeople] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [{ user },] = useStateValue();

  const classes = useStyles()

  const search = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const queryUrl = `/user/get_users/${user._id}/${searchText}/${1}/${10}`
      const res = await axios.get(queryUrl)
      if (!res) {
        throw new Error('empty response')
      }
      setLoading(false)
      setPeople(res.data.data)
    } catch (e) {
      console.log(e.message)
      setLoading(false)
      alert('No person with such name')
      setPeople([])
    } finally {
      setSearchText('')
    }
  }

  return (
    <div className="findFriendModal__body">
      <div className="findFriendModal__search">
        <div className="findFriendModal__searchContainer">
          <IconButton onClick={(e) => search(e)}>
            <SearchOutlined />
          </IconButton>
          <input placeholder="Search for new friends" type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText} />
        </div>
      </div>

      <div className="findFriendModal__friends">
        {
          (people.length > 0) && people.map((item, i) => (
            <FriendsSearchList
              name={item.name}
              status={item.status}
              index={i}
              key={i}
              isSelf={item.isSelf}
              received={item.received}
              requested={item.requested}
              accepted={item.accepted}
              personId={item._id}
              user={user}
            />
          ))
        }
        {loading && <CircularProgress size={38} className={classes.buttonProgress} />}
      </div>
    </div>
  )
}

export default GlobalSearch
