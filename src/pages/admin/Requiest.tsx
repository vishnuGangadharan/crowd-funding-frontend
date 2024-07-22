import React from 'react'
import SidePanel from '../../Components/admin/SidePanel'
import CampaignRequest from './CampaignRequest'

const Requiest = () => {
  return (
    <div className='bg-purple-400 h-screen flex'>
      <SidePanel/>
      <CampaignRequest/>
    </div>
  )
}

export default Requiest
