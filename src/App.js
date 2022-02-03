import { getByTitle } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import Loading from './Loading'

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN

const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [infos, setInfos] = useState()
  const [counter, SetCounter] = useState(0)
  const [loading, setLoading] = useState(true)

  const getFetch = async () => {
    const response = await fetch(url)
    const datas = await response.json()
    setInfos(datas)
    setLoading(false)
  }

  useEffect(() => {
    try {
      getFetch()
    } catch (error) {
      console.log(error)
    }
  }, [])

  if (loading) {
    return <Loading />
  }
  const { title, duties, dates, company } = infos[counter]
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {infos &&
            infos.map((info, index) => {
              return (
                <button
                  className={`job-btn ${index === counter && 'active-btn'}`}
                  onClick={() => SetCounter(index)}
                  key={index}
                >
                  {info.company}
                </button>
              )
            })}
        </div>

        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>

          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
    </section>
  )
}

export default App
