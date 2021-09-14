import React, {FC} from 'react'
import style from './Paginator.module.css'
import {Pagination} from 'antd'

const Paginator: FC<PropsType> = ({
                                    totalItemsCount,
                                    pageSize,
                                    currentPage,
                                    onPageChanged
                                  }) => {
  return (
    <div className={style.paginator}>
      <Pagination
        total={totalItemsCount}
        current={currentPage}
        defaultCurrent={1}
        pageSize={pageSize}
        onChange={onPageChanged}
      />
    </div>
  )
}

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  portionSize?: number
  onPageChanged: (pageNumber: number) => void
}

export default Paginator
