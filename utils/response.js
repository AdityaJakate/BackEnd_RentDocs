const response = (res, result, msg, data) => {

    res.status(result).send({ message: msg, data: data });
}

module.exports={response};