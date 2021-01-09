import React from 'react';
import { graphql } from 'gatsby';
import PostPreview from '../components/PostPreview/PostPreview';
import SEO from '../components/seo';
import TagsFilter from '../components/TagsFilter/TagsFilter';
import '../components/PostPreview/PostPreview.scss';

const BlogPageTemplate = ({ data }) => {
	return (
		<>
			<SEO title='Blog' />
			<h1 className='blog-page-title'>Blog</h1>
			<p className='blog-page-excerpt'>
				Acá podrás encontrar artículos cortos sobre desarrollo web y tecnología.
			</p>
			<TagsFilter categories={data.contentYaml.categories} />
			<div className='post-link-wrapper'>
				{data.allMdx.edges.map(edge => (
					<PostPreview key={edge.node.id} post={edge.node} />
				))}
			</div>
		</>
	);
};

export default BlogPageTemplate;

export const BlogPageQuery = graphql`
	query {
		allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
			edges {
				node {
					id
					excerpt(pruneLength: 250)
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						description
						tags
						thumbnail
					}
					fields {
						slug
					}
				}
			}
		}
		contentYaml {
			categories {
				name
			}
		}
	}
`;
