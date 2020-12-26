import React, { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

const ImageBlog = ({ src, ...rest }) => {
	const data = useStaticQuery(graphql`
		query {
			images: allFile(filter: { absolutePath: { regex: "/static/img/" } }) {
				edges {
					node {
						relativePath
						extension
						publicURL
						childImageSharp {
							fluid(maxWidth: 1000, maxHeight: 800) {
								...GatsbyImageSharpFluid
							}
						}
					}
				}
			}
		}
	`);

	const match = useMemo(
		() => data.images.edges.find(({ node }) => src === '/img/' + node.relativePath),
		[data, src]
	);

	if (!match) return null;

	const { node: { childImageSharp, publicURL, extension } = {} } = match;

	if (extension === 'svg' || !childImageSharp) {
		return <img src={publicURL} alt='some random svg' {...rest} />;
	}

	return <Img fluid={childImageSharp.fluid} {...rest} />;
};

ImageBlog.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string
};

export default ImageBlog;