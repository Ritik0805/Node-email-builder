# as-email-builder

## Server

### get started

```
yarn install
yarn start
```

### test

```
#Render philosophies
http://localhost:3001/v1/email/alert2Cards/?json=alert2.json
# Render just HTML
http://localhost:3001/v1/email/plain-html

# Render with Handlebars
http://localhost:3001/v1/email/your-recommended-reads/?json=your-recommended-reads.json

# Render Search Feed
http://localhost:3001/v1/email/searchFeedEmail?searchFeedId=e59d75ac-619c-4657-bfea-5eb1d7a2dd65&token=d7cfa421-2154-46ee-b606-7511966f95aa

# Alert Template - Cards
http://localhost:3001/v1/email/alertCards/?json=alert.json

# Alert Template - Table
http://localhost:3001/v1/email/alertTable/?json=alert.json
```

### Static Images

Currently, the Advanced Alert Template is referencing image files in the `static` directory. To make these files available, install `serve`:

```
sudo npm install --g serve
```

Then, from the root project directory (`node-email-builder-server`) run `serve`:

```
serve static
```

### Partials

The alert templates use partials, which are small parts of code that are shared between both layouts.

When you see code like this in the template:
```
{{> alertHeader}}
```
You can look at the corresponding file `alertHeader.partial` to see the code that is being executed.


## CLI/Executable

build a new verison of pkg via `yarn pkg`.

You can move the executable anywhere on your file system. And export it to use it elsewhere. Add this line to your profile:

```
alias asEmailBuilder="execute PATH_TO_THIS_REPO/dist/as-email-builder"
```

```
yarn install

# Render just HTML
./dist/as-email-builder --html ./templates/plain-html.html --css ./templates/email.css

# Render just HTML + Save to File
./dist/as-email-builder --html ./templates/plain-html.html --css ./templates/email.css > PATH_TO_OUTPUT.HTML

# Render with Handlebars
./dist/as-email-builder --html ./templates/your-recommended-reads.html --css ./templates/email.css --data ./data/your-recommended-reads.json

# Render Search Feed
./dist/as-email-builder --html ./templates/searchFeedEmail.html --css ./templates/email.css --searchFeedId="e59d75ac-619c-4657-bfea-5eb1d7a2dd65" --token="d7cfa421-2154-46ee-b606-7511966f95aa"

```
