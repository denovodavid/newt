$(function() {

    vm.$firebaseRefs.notes.on('child_added', function (snap) {
        console.log('child_added');
    });

    vm.$firebaseRefs.notes.on('child_removed', function (snap) {
        console.log('child_removed');
    });

    vm.$firebaseRefs.notes.on('child_changed', function (snap, oldKey) {
        console.log('child_changed');
    });

    // TODO: Add as derivative
    $('#note-text').on('keydown', function (event) {
        if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey) {
            vm.create();
        }
    });

    $('#edit-text').on('keydown', function (event) {
        if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey) {
            $(vm.$els.editor).modal('hide');
        }
    });

});
