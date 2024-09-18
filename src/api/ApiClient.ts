/* eslint-disable react/no-is-mounted */

import { PlaygroundClient } from '@wp-playground/client';
import { Post } from '@/api/Post';

export class ApiClient {
	private readonly playgroundClient: PlaygroundClient;
	private readonly _siteUrl: string;

	constructor( playgroundClient: PlaygroundClient, siteUrl: string ) {
		this.playgroundClient = playgroundClient;
		this._siteUrl = siteUrl;
	}

	get siteUrl(): string {
		return this._siteUrl;
	}

	async createPost( data: { guid: string } ): Promise< Post > {
		const { guid } = data;
		return ( await this.post( '/liberated_posts', {
			meta: {
				guid,
			},
		} ) ) as Post;
	}

	async getPosts(): Promise< Post[] > {
		return ( await this.get( '/posts' ) ) as Post[];
	}

	private async get( route: string ): Promise< object > {
		const response = await this.playgroundClient.request( {
			url: `/index.php?rest_route=/wp/v2${ route }`,
			method: 'GET',
		} );
		if ( response.httpStatusCode !== 200 ) {
			console.error( response );
			throw Error( response.json.message );
		}
		return response.json;
	}

	private async post( route: string, body: object ): Promise< object > {
		const response = await this.playgroundClient.request( {
			url: `/index.php?rest_route=/wp/v2${ route }`,
			method: 'POST',
			body: JSON.stringify( body ),
		} );
		if ( response.httpStatusCode !== 201 ) {
			console.error( response );
			throw Error( response.json.message );
		}
		return response.json;
	}
}

/* eslint-enable react/no-is-mounted */
