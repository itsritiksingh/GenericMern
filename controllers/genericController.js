const {middleware : query} = require("querymen");


class Controller {
  constructor(model) {
    this.model = model;
    this.Create = this.Create.bind(this);
    this.Delete = this.Delete.bind(this);
    this.pushUpdate = this.pushUpdate.bind(this);
    this.Update = this.Update.bind(this);
    this.GetElementById = this.GetElementById.bind(this);
    this.GetELement = this.GetELement.bind(this);
  }

  // POST	/{content-type}	Create a {content-type} entry
  Create(req, res) {
    new this.model(req.body)
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.status(400).send(err));
  }

  // DELETE	/{content-type}/:id	 Delete a {content-type} entry
  Delete(req, res) {
    this.model
      .deleteOne({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch((err) => res.status(400).send(err));
  }

  //PUT	/{content-type}/:id	Update a {content-type} entry
  //to pushinto an array
  //@body : {attributename: data to push}
  pushUpdate(req, res) {
    this.model
      .updateOne({ _id: req.params.id }, { $push: req.body })
      .then((data) => res.json(data))
      .catch((err) => res.status(400).send(err));
  }

  //PUT	/{content-type}/:id	Update a {content-type} entry
  //to pushinto an array
  //@body : {attributename: data to pull}
  pullUpdate(req, res) {
    this.model
      .updateOne({ _id: req.params.id }, { $pull: req.body })
      .then((data) => res.json(data))
      .catch((err) => res.status(400).send(err));
  }

  //PUT	/{content-type}/:id	Update a {content-type} entry
  Update(req, res) {
    this.model
      .updateOne({ _id: req.params.id }, { $set: req.body })
      .then((data) => res.json(data))
      .catch((err) => res.status(400).send(err));
  }

  //GET	/{content-type}/:id	Get a specific {content-type} entry
  GetElementById(req, res) {
    this.model
      .findOne({ _id: req.params.id })
      .then((data) => res.send(data))
      .catch((err) => res.status(400).send(err));
  }

  //it has it own imlement for query you need to enter q as search string and
  //seach query into which attribute q will be searched
//eg: search=name&q=new project&limit=5&fields=description
  //visit https://www.npmjs.com/package/querymen
  GetELement(req, res) {
    query(req,res)
    this.model
      .find(
        { [req.query.search]: req.query.q },
        req.querymen?.select,
        req.querymen?.cursor
      )
      .populate(req.query.populate)
      .then((data) => res.json(data))
      .catch((err) => res.status(400).send(err));
  }
}

exports.Controller = Controller;
