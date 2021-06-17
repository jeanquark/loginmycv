const advancedResults = (model, populate) => async (req, res, next) => {
    let query

    // Copy req.query
    const reqQuery = { ...req.query }
    console.log('advancedResults reqQuery: ', reqQuery)
    console.log('req.query.limit: ', req.query.limit)
    console.log('req.query.select: ', req.query.select)
    console.log('req.query.search: ', req.query.search)
    console.log('populate: ', populate)

    // Fields to exclude
    // const removeFields = ['select', 'sort', 'page', 'limit']
    const removeFields = ['select', 'sort', 'page', 'limit', 'search']

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param])

    // Create query string
    let queryStr = JSON.stringify(reqQuery)
    // console.log('queryStr1: ', queryStr)

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    console.log('queryStr2: ', queryStr)

    // Finding resource with or without search parameter
    let total
    // let abc
    if (req.query.search) {
        query = model.find({ $text: { $search: req.query.search } })
        // abc = await model.aggregate([
        //     {
        //         $match: {
        //             $or: [
        //                 {
        //                     firstname: {
        //                         $regex: req.query.search,
        //                         $options: 'i'
        //                     }
        //                 },
        //                 {
        //                     lastname: {
        //                         $regex: req.query.search,
        //                         $options: 'i'
        //                     }
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         $facet: {
        //             paginatedResults: [
        //                 {
        //                     $limit: 2
        //                 }
        //             ],
        //             totalCount: [
        //                 {
        //                     $count: 'count'
        //                 }
        //             ]
        //         }
        //     }
        //     // {
        //     // 	$limit: 2
        //     // },
        //     // {
        //     // 	$count: 'total'
        //     // },
        //     // {
        //     // 	$project: {
        //     // 		'firstname': 1,
        //     // 		'lastname': 1,
        //     // 		'email': 1,
        //     // 		'created_at': 1
        //     // 	}
        //     // },
        //     // {
        //     // 	$sort: {
        //     // 		'created_at': 1
        //     // 	}
        //     // }
        // ])
        // // .facet({
        // //     results: [
        // //         {
        // //             $limit: 2
        // //         }
        // //     ],
        // //     totalCount: [
        // //         {
        // //             $count: 'total'
        // //         }
        // //     ]
        // // })
        // console.log('abc: ', abc)
        total = await model.find({ $text: { $search: req.query.search } }).countDocuments()

        // total = await model.find({ $text: { $search: req.query.search } }).countDocuments()
        // console.log('total: ', total)
    } else {
        query = model.find(JSON.parse(queryStr))
        total = await model.countDocuments()
    }
    // query = model.find(JSON.parse(queryStr))

    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('-created_at')
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 25
    console.log('limit: ', limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    // const total = await model.countDocuments()
    console.log('total: ', total)

    query = query.skip(startIndex).limit(limit)

    if (populate) {
        query = query.populate(populate)
    }

    // Executing query
    const results = await query
    console.log('results: ', results)
    // console.log('query.countDocuments(): ', query.countDocuments())

    // Pagination result
    const pagination = {}

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
    console.log('pagination: ', pagination)

    res.advancedResults = {
        success: true,
        total,
        count: results.length,
        pagination,
        data: results,
        // abc
    }

    next()
}

module.exports = advancedResults
