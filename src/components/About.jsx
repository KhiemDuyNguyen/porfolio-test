import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import Github from './Github';

const styles = {
  introTextContainer: {
    margin: 5,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1em',
    fontWeight: 600,
  },
  honorTextContainer: {
    textAlign: 'left',
    fontSize: '1em',
    fontWeight: 450,
    fontWeight: 600,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
    
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  <Col style={styles.introTextContainer}>
                    {parseIntro(data.about)}
                  </Col>
                  <Col style={styles.honorTextContainer}>
                    {parseIntro(data.honor)}
                  </Col>
                  <Col style={styles.introImageContainer}>
                    <img src={data?.imageSource} alt="profile" />
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
        <Github />
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
