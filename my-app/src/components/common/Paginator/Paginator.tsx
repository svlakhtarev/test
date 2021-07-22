import React, {FC, useState} from 'react'
import cn from 'classnames'
import style from './Paginator.module.css'
import {MyButtonClick} from '../FormsControls/formsContorls'

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  portionSize?: number
  onPageChanged: (pageNumber: number) => void
}
const Paginator: FC<PropsType> = ({
                                    totalItemsCount,
                                    pageSize,
                                    currentPage,
                                    onPageChanged,
                                    portionSize = 10
                                  }) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize)
  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, SetPortionNumber] = useState(1)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize

  return (
    <div className={style.paginator}>
      {portionNumber > 1 && <MyButtonClick onClick={() => {
        SetPortionNumber(portionNumber - 1)
      }
      } title={'PREV'}/>}
      {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
          return <span className={cn({
            [style.selectedPage]: currentPage === p
          }, style.pageNumber)}
                       key={p}
                       onClick={
                         (e) => {
                           onPageChanged(p)
                         }
                       }>{p}</span>
        })
      }
      {portionCount > portionNumber &&
      <MyButtonClick onClick={() => {
        SetPortionNumber(portionNumber + 1)
      }
      } title={'NEXT'}/>}
    </div>
  )
}

export default Paginator
