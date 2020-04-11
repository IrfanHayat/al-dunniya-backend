import Ratingschema from '../Models/ratingSchema';

const addRating = async (req, res, next) => {
	const { rating, userId } = req.body;
	const saveRating = new Ratingschema({
		rating,
		userId,
	});
	saveRating
		.save()
		.then(ratingData => {
			res.status(200).json({ ratingData });
		})
		.catch(error => {
			next(Error(error));
		});
};

export default addRating;
