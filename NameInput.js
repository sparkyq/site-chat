import { USER_KEY } from 'constants'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import storage from 'utils/storage'

export const NameInput = () => {
  // Початкові дані
  const [formData, setFormData] = useState({
    userName: '',
    roomId: 'main_room'
  })
  // стан кнопки блокування
  const [submitDisabled, setSubmitDisabled] = useState(true)

  // всі поля є обов'язковими
  useEffect(() => {
    const isSomeFieldEmpty = Object.values(formData).some((v) => !v.trim())
    setSubmitDisabled(isSomeFieldEmpty)
  }, [formData])

  // ф-ції для зніми даних
  const onChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value })
  }

  // ф-ція для відправки форми
  const onSubmit = (e) => {
    e.preventDefault()
    if (submitDisabled) return
    const userId = nanoid()
    storage.set(USER_KEY, {
      userId,
      userName: formData.userName,
      roomId: formData.roomId
    })

    window.location.reload()
  }

  return (
    <div className='container name-input'>
      <h2>Welcome</h2>
      <form onSubmit={onSubmit} className='form name-room'>
        <div>
          <label htmlFor='userName'>Enter your name</label>
          <input
            type='text'
            id='userName'
            name='userName'
            minLength={2}
            required
            value={formData.userName}
            onChange={onChange}
          />
        </div>
        <div class='visually-hidden'>
          <label htmlFor='roomId'>Enter room ID</label>
          <input
            type='text'
            id='roomId'
            name='roomId'
            minLength={4}
            required
            value={formData.roomId}
            onChange={onChange}
          />
        </div>
        <button disabled={submitDisabled} className='btn chat'>
          Chat
        </button>
      </form>
    </div>
  )
}