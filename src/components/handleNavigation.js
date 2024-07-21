import { useNavigate } from 'react-router-dom'

const useHandleNavigation = () => {
  const navigate = useNavigate()

  const handlebuttonClick = (value) => {
    const currentURL = window.location.href

    if (value === 'home') {
      if (!currentURL.includes('/home')) {
        navigate('/')
      }
    }
    if (value === 'upcoming-events') {
      if (!currentURL.includes('/upcoming-events')) {
        navigate('/upcoming-events')
      }
    }
    if (value === 'meet-the-team') {
      if (!currentURL.includes('/meet-the-team')) {
        navigate('/meet-the-team')
      }
    }
    if (value === 'magazine') {
      if (!currentURL.includes('/magazine')) {
        navigate('/magazine')
      }
    }
    if (value === 'admin-portal') {
      if (!currentURL.includes('/admin-portal')) {
        navigate('/adminlogin')
      }
    }
  }

  const handleiconClick = (value) => {
    if (value === 'facebook') {
      window.open('https://www.facebook.com/durgaville/', '_blank')
    }
    if (value === 'instagram') {
      window.open('https://www.instagram.com/durgaville/', '_blank')
    }
    if (value === 'youtube') {
      window.open('https://www.youtube.com/@durgaville8491', '_blank')
    }
  }

  return { handlebuttonClick, handleiconClick }
}

export default useHandleNavigation
