module SamplePlugin
  class CategoryPageGenerator < Jekyll::Generator
    safe true

    def generate(site)
      #site.categories.each do |category, posts|
        site.pages << CategoryPage.new(site)
      #end
    end
  end

  # Subclass of `Jekyll::Page` with custom method definitions.
  class CategoryPage < Jekyll::Page
    def initialize(site)
      @site = site             # the current site instance.
      @base = site.source      # path to the source directory.
      @dir  = "hellomyworld"         # the directory the page will reside in.

      # All pages have the same filename, so define attributes straight away.
      @basename = 'index'      # filename without the extension.
      @ext      = '.html'      # the extension.
      @name     = 'index.html' # basically @basename + @ext.

      # Initialize data hash with a key pointing to all posts under current category.
      # This allows accessing the list in a template via `page.linked_docs`.
      @data = { }
      @content = "<p>Hello World</p>"

      # Look up front matter defaults scoped to type `categories`, if given key
      # doesn't exist in the `data` hash.
      data.default_proc = proc do |_, key|
        site.frontmatter_defaults.find(relative_path, :hello, key)
      end
    end

    # Placeholders that are used in constructing page URL.
    def url_placeholders
      {
        :path       => @dir,
        :category   => @dir,
        :basename   => basename,
        :output_ext => output_ext,
      }
    end
  end
end
