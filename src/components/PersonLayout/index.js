import Box from '@spraoi/base/Box';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import PeopleContainer from '../../containers/PeopleContainer';
import SEO from '../SEO';
import Section from '../Section';
import newlineToSpace from '../../utilities/newline-to-space';
import possessive from '../../utilities/posessive';
import LinkList from '../LinkList';

const PersonLayout = ({ location: { pathname }, pageContext: { slug } }) => (
  <PeopleContainer>
    {(people) => {
      const person = people.find((person) => slug.includes(person.id));
      const name = `${person.givenName} ${person.familyName}`;
      const isActive = person.active === 'y';

      return (
        <>
          <SEO
            description="Unique, global team of professionals delivering ensuring today&rsquo;s needs become tomorrow&rsquo;s results."
            pathname={pathname}
            person={person}
            title={name}
          />
          <Section>
            <Img alt="" fluid={person.image} />
            <Box>{name}</Box>
            <Box>{isActive ? person.position : 'Spraoi Alumnus'}</Box>
            {isActive && <p>{newlineToSpace(person.bio)}</p>}
          </Section>
          {!!person.articles.length && (
            <Section>
              <h2>{possessive(person.givenName)} Perspectives</h2>
              <LinkList
                items={person.articles.map((article) => ({
                  link: `/perspectives${article.fields.slug}`,
                  subText: article.frontmatter.datePublished,
                  title: article.frontmatter.title,
                }))}
              />
            </Section>
          )}
        </>
      );
    }}
  </PeopleContainer>
);

PersonLayout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default PersonLayout;
