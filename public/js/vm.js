Vue.config.devtools = true;

var mdRenderer = new marked.Renderer();
mdRenderer.image = function (href, title, text) {
    return '<p><img src="' + href + '" alt="' + text + '" class="ui image"></p>';
};
mdRenderer.link = function (href, title, text) {
    return '<a href="' + href + '" target="_blank">' + text + '</a>';
};
marked.setOptions({
    renderer: mdRenderer
});

var shapeshiftOptions = {
    selector: '.newt-note',
    colWidth: 290,
    animated: false,
    handle: '.drag-handle'
};

var noteColors = {
    none: '',
    red: '#ff8a80',
    orange: '#ffd180',
    yellow: '#ffff8d',
    green: '#ccff90',
    teal: '#a7ffeb',
    blue: '#80d8ff',
    purple: '#b680ff',
    pink: '#ff80ef',
    grey: '#cfd8dc'
};

var vm = new Vue({
    el: '#newt',
    firebase: {
        notesOrder: {
            source: db.ref('notesOrder'),
            asObject: true
        },
        notes: db.ref('notes')
    },
    data: {
        newNote: {
            title: '',
            text: '',
            markdown: false,
            color: 'none',
            created_at: ''
        },
        editor: {
            title: '',
            text: '',
            markdown: false,
            color: 'none',
            created_at: ''
        },
        noteColors: noteColors
    },
    ready: function () {
        var self = this;
        self.$firebaseRefs.notes.once('value', function () {
            $('#page-loader').fadeOut(400, function () {
                $(this).removeClass('active');
            });
            console.log('data_loaded');
        });
        console.log('ready');
    },
    methods: {
        createNote: function () {
            var self = this;
            self.$firebaseRefs.notes.push({
                title: self.newNote.title.trim(),
                text: self.newNote.text.trim(),
                markdown: self.newNote.markdown,
                color: self.newNote.color,
                created_at: new Date().toJSON()
            }, function () {
                console.log('write success');
                Vue.nextTick(function () {
                    self.setNotesOrder();
                });
                $('#loading-icon').fadeOut(300, function () {
                    $(this).removeClass('notched circle loading').addClass('checkmark').fadeIn();
                });
            });
            $('#loading-icon').removeClass('checkmark').addClass('notched circle loading');
            $('#note-title').focus();
            self.$set('newNote.title', '');
            self.$set('newNote.text', '');
        },
        copyNote: function (note) {
            var self = this;
            self.$firebaseRefs.notes.push({
                title: note.title,
                text: note.text,
                markdown: note.markdown,
                color: note.color,
                created_at: note.created_at
            }, function () {
                console.log('copy success');
                $('#loading-icon').fadeOut(300, function () {
                    $(this).removeClass('notched circle loading').addClass('checkmark').fadeIn();
                });
            });
            $('#loading-icon').removeClass('checkmark').addClass('notched circle loading');
        },
        editNote: function (note) {
            var self = this;
            var key = note['.key'];
            self.$set('editor', note);
            $(self.$els.editor).modal('show');
        },
        editorSaveNote: function () {
            var self = this;
            self.updateNote(self.editor);
            self.arrangeNotes();
            $(self.$els.editor).modal('hide');
        },
        editorRemoveNote: function (editor) {
            var self = this;
            self.removeNote(editor);
            $(self.$els.editor).modal({
                onHidden: undefined
            }).modal('hide').modal({
                onHidden: self.editorSaveNote
            });
        },
        editorCopyNote: function (editor) {
            var self = this;
            self.copyNote(editor);
            $(self.$els.editor).modal('hide');
        },
        updateNote: function (note) {
            var self = this;
            var key = note['.key'];
            self.$firebaseRefs.notes.child(key).update({
                title: note.title,
                text: note.text,
                markdown: note.markdown,
                color: note.color
            }, function () {
                console.log('update success');
            });
        },
        setNoteColor: function (note, color) {
            var self = this;
            note.color = color;
            self.updateNote(note);
        },
        setNewNoteColor: function (color) {
            var self = this;
            self.$set('newNote.color', color);
        },
        setEditorNoteColor: function (color) {
            var self = this;
            self.$set('editor.color', color);
        },
        removeNote: function (note) {
            var self = this;
            var key = note['.key'];
            self.$firebaseRefs.notes.child(key).remove()
                .then(function() {
                    console.log('remove success');
                })
                .catch(function(error) {
                    console.log('remove failed:' + error.message);
                });
        },
        getColorHex: function (colorName) {
            return Vue.filter('noteColorToHex')(colorName);
        },
        toggleNewNoteMarkdown: function () {
            var self = this;
            self.$set('newNote.markdown', !self.newNote.markdown);
        },
        toggleEditorNoteMarkdown: function () {
            var self = this;
            self.$set('editor.markdown', !self.editor.markdown);
        },
        setNotesOrder: function () {
            var self = this;
            var $notes = $(self.$els.notes);
            var order = {};
            $notes.children('.newt-note').each(function(i, itemElem) {
                var noteKey = $(itemElem).data('key');
                order[noteKey] = i + 1;
            });
            self.$firebaseRefs.notesOrder.update(order, function () {
                console.log('update order success');
            });
            Vue.nextTick(function () {
                self.arrangeNotes();
            });
        },
        arrangeNotes: function () {
            var self = this;
            $(self.$els.notes).trigger('ss-rearrange');
        },
        orderNotes: function (a, b) {
            var self = this;
            var aKey = a['.key'];
            var bKey = b['.key'];
            var aOrder = self.notesOrder[aKey];
            var bOrder = self.notesOrder[bKey];
            if (aOrder === undefined || aOrder === null) return -1;
            if (aOrder == bOrder) return 0;
            if (aOrder < bOrder) return -1;
            else return 1;
        }
    },
    directives: {
        notes: {
            bind: function () {
                var self = this;
                var $notes = $(self.el);
                $notes.on('ss-drop-complete', function(e) {
                    self.vm.setNotesOrder();
                });
            },
            unbind: function () {
                var self = this;
                var $notes = $(self);
                $notes.off();
                $notes.trigger('ss-destroy');
            }
        },
        note: {
            bind: function () {
                var self = this;
                var $note = $(self.el);
                var $notes = $(self.vm.$els.notes);
                $note.on({
                    mouseenter: function () {
                        $(this).find('.extra.content').css({'visibility': 'visible'});
                        $(this).find('.drag-handle').css({'visibility': 'visible'});
                    },
                    mouseleave: function () {
                        $(this).find('.extra.content').css({'visibility': 'hidden'});
                        $(this).find('.drag-handle').css({'visibility': 'hidden'});
                    },
                    click: function () {
                        $notes.children('.newt-note').css('z-index', '');
                        $(this).css('z-index', '2');
                    }
                });
                Vue.nextTick(function () {
                    $notes.shapeshift(shapeshiftOptions);
                });
            },
            unbind: function () {
                var self = this;
                var $note = $(self.el);
                var key = $note.data('key');
                self.vm.$firebaseRefs.notesOrder.child(key).remove();
                $note.off();
                self.vm.arrangeNotes();
            }
        },
        dropdown: {
            bind: function () {
                $(this.el).dropdown();
            },
            unbind: function () {
                $(this.el).dropdown('destroy');
            }
        },
        editor: {
            bind: function () {
                var self = this;
                $(this.el).modal({
                    blurring: true,
                    onHidden: self.vm.editorSaveNote
                });
            },
            unbind: function () {
                $(this.el).modal('destroy');
            }
        },
        modal: {
            bind: function () {
                $(this.el).modal();
            },
            unbind: function () {
                $(this.el).modal('destroy');
            }
        },
        autogrow: {
            bind: function () {
                var self = this;
                $(this.el).autogrow({
                    vertical: true,
                    horizontal: false,
                    flickering: false,
                    postGrowCallback: function () {
                        $(self.vm.$els.editor).modal('refresh');
                    }
                });
            }
        }
    },
    filters: {
        marked: marked
    },
    watch: {
        notesOrder: {
            handler: function (newVal, oldVal) {
                var self = this;
                console.log('order_changed');
                Vue.nextTick(function () {
                    self.arrangeNotes();
                });
            }
        }
    }
});

Vue.filter('formatDate', function (value) {
    var date = new Date(value);
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
});

Vue.filter('noteColorToHex', function (colorName) {
    return noteColors[colorName];
});
