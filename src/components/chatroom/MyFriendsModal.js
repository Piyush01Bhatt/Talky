import React, { useState } from 'react'
import "./MyFriendsModal.css"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { IconButton } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { useStateValue } from '../../StateProvider';
import axios from "../../helpers/axios"
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { green } from '@material-ui/core/colors';
import { SearchOutlined } from "@material-ui/icons";
import FriendsSearchList from "./FriendsSearchList"

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -18,
    marginLeft: -18,
  }
}))

function MyFriendsModal({ isOpen, handleClose }) {
  const [{ user },] = useStateValue();
  const [people, setPeople] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [nextDisabled, setNextDisabled] = useState(true)
  const [pageNum, setPageNum] = useState(1)

  const classes = useStyles()

  const search = async (e, pageSearchNum) => {
    e.preventDefault();
    setLoading(true)
    try {
      const queryUrl = `/user/get_users/${user._id}/${searchText}/${pageSearchNum}/${9}`
      const res = await axios.get(queryUrl)
      if (!res) {
        throw new Error('empty response')
      }
      if (res.data.data.length > 8) {
        res.data.data.pop()
        setNextDisabled(false)
      } else {
        setNextDisabled(true)
      }
      setLoading(false)
      setPeople(res.data.data)
    } catch (e) {
      console.log(e.message)
      setLoading(false)
      alert('No person with such name')
      setPeople([])
    }
  }


  const paginatePrev = (e) => {
    setPeople([])
    search(e, pageNum - 1)
    setPageNum(pageNum - 1)
  }

  const paginateNext = (e) => {
    setPeople([])
    search(e, pageNum + 1)
    setPageNum(pageNum + 1)
  }

  const body = (
    <div className='my__friends__body'>
      <div className="findFriendModal__body">
        <div className="findFriendModal__search">
          <div className="findFriendModal__searchContainer">
              <SearchOutlined />
            <form>
              <input placeholder="Search for new friends" type="text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText} />
              <button onClick={(e) => {
                  setPeople([])
                  setPageNum(1)
                  search(e, 1)
                }} type="submit">
                Search
              </button>
            </form>

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
    </div>
  );

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className="my__friends__modal">
        {body}
        <DialogActions>
          <IconButton disabled={pageNum <= 1} onClick={(e) => paginatePrev(e)}>
            <ArrowLeftIcon />
          </IconButton>
          <IconButton disabled={nextDisabled} onClick={(e) => paginateNext(e)}>
            <ArrowRightIcon />
          </IconButton>
          <Button onClick={() => {
            setSearchText('')
            setPeople([])
            setNextDisabled(true)
            setPageNum(1)
            handleClose()
          }} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MyFriendsModal
