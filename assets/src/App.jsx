import { useState } from 'react'
import './index.css'

function App() {
  const [input, setInput] = useState('')
  const [os, setOS] = useState('windows')
  const [command, setCommand] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGetCommand = async () => {
    if (!input.trim()) {
      setError('Please describe what you want to do')
      return
    }

    setLoading(true)
    setError('')
    setCommand('')

    try {
      const response = await fetch('/api/infer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          os: os,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.command) {
        setCommand(data.command)
        setError('')
      } else {
        setError('No command generated. Try rewording your request.')
      }
    } catch (err) {
      setError(err.message || 'Failed to generate command. Check your connection.')
      setCommand('')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError('Failed to copy to clipboard')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGetCommand()
    }
  }

  return (
    <div className="app">
      <div className="content">
        <div className="header">
          <h1 className="title">WRITE ENGLISH<br/>GET COMMANDS</h1>
          <p className="subtitle">
            Plain English in, executable shell out. Never copy-paste blindly again with mandatory review and integrated risk checks.
          </p>
        </div>

        <form className="form-section" onSubmit={(e) => {
          e.preventDefault()
          handleGetCommand()
        }}>
          <div className="input-group">
            <label htmlFor="os" className="input-label">OS</label>
            <div className="input-wrapper">
              <select
                id="os"
                value={os}
                onChange={(e) => setOS(e.target.value)}
                className="select-input"
              >
                <option value="windows">Windows</option>
                <option value="macos">macOS</option>
                <option value="ubuntu">Ubuntu</option>
                <option value="debian">Debian</option>
                <option value="fedora">Fedora</option>
                <option value="arch">Arch</option>
                <option value="centos">CentOS</option>
                <option value="alpine">Alpine</option>
                <option value="linux">Linux</option>
              </select>
              <input
                id="description"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What do you want it to do"
                className="text-input"
                disabled={loading}
              />
            </div>
          </div>

          <div className="button-group">
            <button
              type="submit"
              onClick={handleGetCommand}
              disabled={loading || !input.trim()}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <span className="loading"></span>
                  GENERATING
                </>
              ) : (
                'GET COMMAND'
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setInput('')
                setCommand('')
                setError('')
              }}
              disabled={loading}
              className="btn btn-secondary"
            >
              CLEAR
            </button>
          </div>
        </form>

        <div className="output-section">
          <div className="output-label">OUTPUT / SUCCESS</div>
          {error && (
            <>
              <div className="output-status error">
                ERROR
              </div>
              <div className="error-message">{error}</div>
            </>
          )}
          {!error && !command && !loading && (
            <div className="empty-state">
              <div className="empty-state-icon">→</div>
            </div>
          )}
          {loading && (
            <div className="output-status">
              <span className="loading"></span>
              GENERATING...
            </div>
          )}
          {command && !error && (
            <>
              <div className="output-status success">
                SUCCESS
              </div>
              <div className="command-display">
                <code className="command-text">{command}</code>
                <button
                  onClick={handleCopy}
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                >
                  {copied ? '✓ COPIED' : 'COPY'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>COPY</p>
      </footer>
    </div>
  )
}

export default App
