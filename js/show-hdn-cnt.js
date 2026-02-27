( function( $, window, document, DOMPurify, wb ) {
  
  // Todo: Only show the details which contain the display action if we are internal - Like we can poke "canada-preview" server
  // Todo: Handle the options: Current session and fews days (ex. 3 days period and let's action it right away if enabled
  
  let warnBtn = document.querySelector( "template" ).previousElementSibling.querySelector( "details button" );
  warnBtn.addEventListener('click', btnClick);
  
  function btnClick() {
    let tmplWrap = document.querySelector( "template" );
    let tmpl;

    let cloneWrap = document.importNode(tmplWrap.content, true);

    for (const child of cloneWrap.childNodes) {

      // Take the first comment
      if ( child.nodeType === 8 ) {
        // Get the real content
        tmpl = document.createElement('template');
        tmpl.innerHTML = DOMPurify.sanitize( child.data.replaceAll( "< ! - -", "<!--" ).replaceAll( "- - >", "-->" ) );
        break;
      }
    }

    // Get the fragment
    const fragment = tmpl.content,
          parent = tmplWrap.parentElement;
    
    // Remove the warning content
    parent.removeChild( tmplWrap.previousElementSibling )

    // Add this content to the page next to the template
    parent.replaceChild(fragment, tmplWrap );

    // Set the focus
    parent.focus();
    
    // Initiate WET on the parent
    $( parent )
			.find( wb.allSelectors )
			.addClass( "wb-init" )
			.filter( ":not(.wb-init .wb-init)" )
			.trigger( "timerpoke.wb" );
  }
  
}( jQuery, window, document, DOMPurify, wb ) );
