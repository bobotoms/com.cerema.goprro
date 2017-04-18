Notes = {
    getAll: function(o,cb) {
        Notes.using('db').model('goprro','SELECT concat(nom," ",prenom) nomprenom, dateNote, texteNote, diffusion, importance FROM notes join users on users.idUser=notes.idUser order by dateNote desc',cb);
    }
};

module.exports=Notes;