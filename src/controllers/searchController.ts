import express from 'express';
import Innertube from 'youtubei.js';
import APIError from '../classes/APIError.js';
import handleRequestValidationErrors from '../tools/handleRequestValidationErrors.js';


export default class searchController {
	// todo: implement endpoint for Sound Cloud
	static async soundCloud() {

	}

	static async youtube(req: express.Request, res: express.Response) {
		if (handleRequestValidationErrors(req, res))
			return;

		const youtube = await new Innertube({gl: 'US'});
		const search = await youtube.search(req.query.keywords.toString(), {client: 'YOUTUBE'});

		if (search?.videos.length > 0)
			return res.status(200).json(search.videos);

		return res.status(404).json(new APIError(404, ['no such resource'], 'RESOURCE_ERROR'));
	}
}