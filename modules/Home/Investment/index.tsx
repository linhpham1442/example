import Packages from './Packages'
import React from 'react'
import Table from './Packages/Table/index';
import Title from '@/common/components/Title'

const Investment = () => {
  return (
    <div className="py-20 font-bold">
      <div className="title text-center">
        <Title title="SOFIN Investment Package" />
        <div className="packages">
          <Packages />
          <Table />
        </div>
      </div>
    </div>
  )
}

export default Investment